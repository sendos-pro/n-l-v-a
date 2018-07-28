'use strict'

module.exports = function (Files) {
	Files.upload = function (ctx, models, elemId, next) {
		ctx.req.params.container = 'common'

		Files.app.models.Container.upload(ctx.req, ctx.result, {}, function (err, fileObj) {
			if (err) {
				next({name: 'Error', statusCode: 400, message: err.message})
			} else {
				let files = Object.keys(fileObj.files).map(function (k) { return fileObj.files[k][0] })
				let obj = []

				files.forEach(function (file, i, arr) {
					let data = {
						name: file.name,
						originalFilename: file.originalFilename,
						type: file.type,
						container: file.container,
						size: file.size,
						url: '/api/Containers/' + file.container + '/download/' + file.name,
						[models]: elemId
					}

					obj.push(data)

					Files.create({[models]: elemId}, function (err) {
						if (err) next(err)
					})
				})

				next(null, obj)
			}
		})
	}

	Files.observe('before delete', function (ctx, next) {
		let id = ctx.where.id

		Files.findById(id, {}, function (err, instance) {
			if (err) console.log(err)

			if (instance) {
				let name = instance.name
				let container = 'common'

				Files.app.models.Container.removeFile(container, name, function (err) {
					if (err) console.log(err)
					console.log('Delete file from before hooks name:%s id:%d', name, id)
				})
			}
		})

		next()
	})
}

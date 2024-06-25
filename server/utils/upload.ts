import multer from "multer"
const profileStorage = multer.diskStorage({
  destination: function (req, file: Express.Multer.File, cb) {
    console.log(file)
    cb(null, "public/uploads/profile")
  },
  filename: function (req, file: Express.Multer.File, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    const ext = file.mimetype.split("/")[1]
    const newFilename = `${file.fieldname}-${uniqueSuffix}.${ext}`
    console.log(newFilename)
    cb(null, newFilename)
  },
})

const shareStorage = multer.diskStorage({
  destination: function (req, file: Express.Multer.File, cb) {
    cb(null, "public/uploads/story")
  },
  filename: function (req, file: Express.Multer.File, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    const ext = file.mimetype.split("/")[1]
    const newFilename = `${file.fieldname}-${uniqueSuffix}.${ext}`
    cb(null, newFilename)
  },
})

const commentOfStoryStorage = multer.diskStorage({
  destination: function (req, file: Express.Multer.File, cb) {
    cb(null, "public/uploads/storyComment")
  },
  filename: function (req, file: Express.Multer.File, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    const ext = file.mimetype.split("/")[1]
    const newFilename = `${file.fieldname}-${uniqueSuffix}.${ext}`
    cb(null, newFilename)
  },
})

const datingStorage = multer.diskStorage({
  destination: function (req, file: Express.Multer.File, cb) {
    cb(null, "public/uploads/dating")
  },
  filename: function (req, file: Express.Multer.File, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    const ext = file.mimetype.split("/")[1]
    const newFilename = `${file.fieldname}-${uniqueSuffix}.${ext}`
    cb(null, newFilename)
  },
})
export const avatarUpload = multer({ storage: profileStorage })
export const storyUpload = multer({ storage: shareStorage })
export const storyCommentUpload = multer({ storage: commentOfStoryStorage })
export const datingUpload = multer({ storage: datingStorage })

const mongoose = require("mongoose");
const slugify = require("slugify");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  name: { type: String, unique: true, required: true },
  description: { type: String, required: true, trim: true },
  createDate: { type: Date, default: Date.now },
  slug: {
    type: String,
    unique: true,
    default: function () {
      return slugify(this.name, { lower: true, strict: true });
    },
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

// böyle de kullanılabilir
// CourseSchema.pre("validate", function (next) {
//   this.slug = slugify(this.name, { lower: true, strict: true });
//   next();
// });

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;

// const mongoose = require('mongoose');

// const courseSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     subtitle: { type: String, required: true },
//     image: { type: String, required: true },
//     course_name: { type: String, required: true },
//     description: { type: String, required: true },
//     listone: [String], // Career Options
//     listtwo: [String], // Course Content
//     listthree: [String], // Software Covered
//   },
//   { timestamps: true }
// );


// module.exports = mongoose.model('Courses', courseSchema);


const mongoose = require('mongoose');
const slugify = require('slugify');

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    image: { type: String, required: true },
    course_name: { type: String, required: true },
    description: { type: String, required: true },
    listone: [String],
    listtwo: [String],
    listthree: [String],
    slug: { type: String, unique: true } // New field
  },
  { timestamps: true }
);

// Auto-generate slug from course_name
courseSchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = slugify(this.course_name, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Courses', courseSchema);

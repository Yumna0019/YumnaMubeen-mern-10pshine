const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const expect = chai.expect;
chai.use(chaiHttp);

const User1 = {
  _id: "688d06433aec9c195f5a55bc",
  name: "TestUser",
  email: "test12.user@gmail.com",
};
const token = jwt.sign(User1, process.env.JWT_SECRET, { expiresIn: "1h" });

let noteId;

describe("Note API Tests", function () {
  this.timeout(10000);

  it("should create a new note", (done) => {
    chai
      .request(app)
      .post("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Note", content: "This is a test note." })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("title", "Test Note");
        noteId = res.body._id;
        done();
      });
  });

  it("should get all notes", (done) => {
    chai
      .request(app)
      .get("/api/notes")
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });

  it("should update a note", (done) => {
    chai
      .request(app)
      .put(`/api/notes/${noteId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Updated Note Title" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("title", "Updated Note Title");
        done();
      });
  });

  it("should toggle favorite status of the note", (done) => {
  chai
    .request(app)
    .put(`/api/notes/${noteId}/favorite`)
    .set("Authorization", `Bearer ${token}`)
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property("_id", noteId);
      expect(res.body).to.have.property("isFavorite").that.is.a("boolean");
      done();
    });
});


  it("should delete the note", (done) => {
    chai
      .request(app)
      .delete(`/api/notes/${noteId}`)
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message", "Note deleted");
        done();
      });
  });
});

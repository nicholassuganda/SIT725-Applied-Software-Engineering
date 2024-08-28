const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const app = require('../server_get');
const { connectDB } = require('../models/blogModel');

// Configure chai to use chai-http
chai.use(chaiHttp);

// Connect to the database before running tests
before(async () => {
    await connectDB();
});

describe('Blog API', () => {
    // Test the GET route
    describe('GET /api/comments', () => {
        it('should get all comments', (done) => {
            chai.request(app)
                .get('/api/comments')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.data).to.be.an('array');
                    expect(res.body.message).to.equal('Get All Comments Successful');
                    done();
                });
        });
    });

    // Test the POST route
    describe('POST /api/comment', () => {
        it('should add a comment', (done) => {
            const comment = { text: 'This is a test comment', author: 'Test Author' };

            chai.request(app)
                .post('/api/comment')
                .send(comment)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.data).to.be.an('object');
                    expect(res.body.message).to.equal('Comment added successfully');
                    done();
                });
        });
    });
});

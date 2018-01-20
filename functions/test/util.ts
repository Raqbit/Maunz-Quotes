import {suite as Suite, test as Test} from 'mocha-typescript';
import {describe} from 'mocha';
import {isValidGuildID, isValidPageNum} from '../src/util/validation';
import {expect} from 'chai';
import SuccessResponse from "../src/util/success";
import {ErrorResponse} from "../src/util/error";


describe('Utilities', () => {
    @Suite
    class Validation {
        @Test('should validate if value is a valid guild ID')
        test_isValidGuildID() {
            expect(isValidGuildID(90000000000000)).to.be.true;
            expect(isValidGuildID('dfsdfsdf')).to.be.false;
            expect(isValidGuildID('90000000000000')).to.be.true;
        }

        @Test('should validate if value is a valid page number')
        test_isValidPageNum() {
            expect(isValidPageNum(0)).to.be.true;
            expect(isValidPageNum(-20)).to.be.false;
        }
    }

    @Suite
    class Responses {
        @Test('should create a response with a status of 200')
        test_createSuccessResponse() {
            const data = {testData: true};
            const res = new SuccessResponse("This is a test response", data);
            expect(res.status).to.equal(200);
            expect(res.data).to.equal(data);
        }

        @Test('should create an error response with a status of 400')
        test_createErrorResponse() {
            const code = 6969;
            const res = new ErrorResponse(code, 'This is a test error');
            expect(res.status).to.equal(400);
            expect(res.code).to.equal(code);
        }
    }
});
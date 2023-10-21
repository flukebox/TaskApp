import { getMockReq, getMockRes } from '@jest-mock/express'
import { mocked } from 'jest-mock';
import type { Request, Response } from 'express';
import {getTasks} from './TaskController';


describe('Tasks Controllers Suit', () => {
    afterAll(() => {
      jest.resetAllMocks();
    });
    test('will respond with tasks list from the service', async () => {
        // fill up right mock objec to complete the test
        expect(2+2).toBe(4);
    })
});
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

// The legacy unversioned /streams and /events routes were removed past their
// sunset date (see fix(#619): "remove legacy /streams and /events handlers past
// their sunset date"). They are no longer served, so they respond with 404.
// This test locks in that they stay removed. If the intent is instead to keep a
// permanent 410 Gone tombstone, restore the handlers rather than changing this.

describe('Removed legacy routes', () => {
    it('POST /streams is no longer served (404)', async () => {
        const response = await request(app)
            .post('/streams')
            .send({})
            .set('Accept', 'application/json');

        expect(response.status).toBe(404);
    });

    it('POST /events is no longer served (404)', async () => {
        const response = await request(app)
            .post('/events')
            .send({})
            .set('Accept', 'application/json');

        expect(response.status).toBe(404);
    });
});

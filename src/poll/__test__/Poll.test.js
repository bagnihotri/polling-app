import {
  getRandomMatch
} from "../Poll";

jest.mock('../../data/polling.json', () => {
  return [{
      "awayName": "Panthrakikos Komotini",
      "createdAt": "2015-12-18T12:30:39.228Z",
      "group": "Greek Cup",
      "homeName": "Chania FC",
      "id": 1002916450,
      "name": "Chania FC - Panthrakikos Komotini",
      "objectId": "1UaQjc7lIb",
      "sport": "FOOTBALL",
      "country": "ENGLAND",
      "state": "FINISHED"
    },
    {
      "awayName": "PAOK Thessaloniki",
      "createdAt": "2015-12-18T12:30:39.234Z",
      "group": "Greek Cup",
      "homeName": "Olympiakos Volos",
      "id": 1002916451,
      "name": "Olympiakos Volos - PAOK Thessaloniki",
      "objectId": "UPJ240T2Qj",
      "sport": "FOOTBALL",
      "country": "FRANCE",
      "state": "STARTED"
    }
  ]
});
test("getRandomMatch should return random active match", () => {
  expect(getRandomMatch().id).toBe(1002916451)
})
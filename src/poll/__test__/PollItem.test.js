import React from 'react';
import {
  render, waitForElement, fireEvent, getByTestId
} from '@testing-library/react';
import PollItem from '../PollItem';
import { matchState } from '../helper';

const mockMatch = {
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

test('renders PollItem component', () => {
  const { getByText } = render(<PollItem match={mockMatch} />);
  expect(getByText(`${mockMatch.awayName} vs ${mockMatch.homeName}`)).toBeInTheDocument()
  expect(getByText(matchState[mockMatch.state])).toBeInTheDocument()
  expect(getByText("Who will win?")).toBeInTheDocument()
  expect(getByText(/Votes: 0/i)).toBeInTheDocument()
  expect(getByText("draw")).toBeInTheDocument()
});

test('cast draw vote', async () => {
  const { getByText, getByTitle, getByTestId } = render(<PollItem match={mockMatch} />);
  fireEvent.click(getByTitle('draw'));

  const votesDraw = await waitForElement(() => getByText("Votes: 1"))
  const drawSelected = await waitForElement(() => getByTestId("poll-selected"))
  expect(votesDraw).toBeInTheDocument();
  expect(drawSelected).toBeInTheDocument();
})

test("cast home team vote", async () => {
  const { getByText, getByTitle, getByTestId } = render(<PollItem match={mockMatch} />);
  fireEvent.click(getByTitle(mockMatch.homeName));
  const votesHome = await waitForElement(() => getByText("Votes: 2"))
  const homeSelected = await waitForElement(() => getByTestId("poll-selected"))
  expect(votesHome).toBeInTheDocument();
  expect(homeSelected).toBeInTheDocument();
})

test("cast away team vote", async () => {
  const { getByText, getByTitle, getByTestId } = render(<PollItem match={mockMatch} />);
  fireEvent.click(getByTitle(mockMatch.awayName));
  const votesAway = await waitForElement(() => getByText("Votes: 3"))
  const awaySelected = await waitForElement(() => getByTestId("poll-selected"))
  expect(votesAway).toBeInTheDocument();
  expect(awaySelected).toBeInTheDocument();
})
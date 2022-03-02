import React from "react";
import {render, screen, cleanup} from '@testing-library/react'
import App from "../../App";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

test('expect render without errors', () => {
    render(<App />)
})

test('expect enable button if have some text', async () => {
    render(<App />);
    userEvent.type(screen.getByPlaceholderText(/input text/i), 'Какой-то текст для проверки');

    expect(await screen.findByRole('button', {name: 'Should disabled then textarea NOT empty'})).toBeEnabled();
})

test('expect disable button if doesnt have some text', async () => {
    render(<App />);

    expect(await screen.findByRole('button', {name: 'Should disabled then textarea NOT empty'})).toBeDisabled();
})

test('expect render the main send button if text and value not empty', async () => {
    render(<App />);
    userEvent.type(screen.getByPlaceholderText(/price/i), '50');
    userEvent.type(screen.getByPlaceholderText(/input text/i), 'Какой-то текст для проверки');

    expect(await screen.findByRole('button', {name: 'Send data'})).toBeEnabled();
})

test('added new list item then collect all data ONE', async () => {
    render(<App />);
    userEvent.type(screen.getByPlaceholderText(/price/i), '50');
    userEvent.type(screen.getByPlaceholderText(/input text/i), 'Какой-то текст для проверки');

    userEvent.click(await screen.findByRole('button', {name: 'Send data'}));

    const items = screen.getAllByRole("listitem")
    expect(items.length).toBe(1)
})

test('added new list item then collect all data MULTI', async () => {
    render(<App />);
    userEvent.type(screen.getByPlaceholderText(/price/i), '50');
    userEvent.type(screen.getByPlaceholderText(/input text/i), 'Какой-то текст для проверки');

    userEvent.click(await screen.findByRole('button', {name: 'Send data'}));
    userEvent.click(await screen.findByRole('button', {name: 'Send data'}));
    userEvent.click(await screen.findByRole('button', {name: 'Send data'}));

    const items = screen.getAllByRole("listitem")
    expect(items.length).toBe(3)
})
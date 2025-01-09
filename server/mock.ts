import { User } from 'domain/user';

import express from 'express';

import { corsConfig } from './cors';
import moviesData from './data/movies.json';
import tvSeriesData from './data/tv-series.json';
import usersData from './data/users.json';

const sleep = async (ms: number) =>
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const app = express();

app.use(corsConfig);

const port = 3003;

app.get('/movies', (req, res) => {
  res.json(moviesData.movies);
});

app.get('/movies/:movieId', (req, res) => {
  res.json(moviesData.movies.find((it) => it.id === req.params.movieId));
});

app.get('/tv-series/:movieId/poster', (req, res) => {
  res.json({ url: req.url + '/img/poster.jpg' });
});

app.get('/movies/recommended', async (req, res) => {
  const timeoutMs = Math.max(1, Math.random() * 3) * 1000;
  await sleep(timeoutMs);

  res.json(moviesData.movies.slice(0, 5));
});

app.get('/tv-series', (req, res) => {
  res.json(tvSeriesData.tvSeries);
});

app.get('/tv-series/recommended', async (req, res) => {
  const timeoutMs = Math.max(2, Math.random() * 5) * 1000;
  await sleep(timeoutMs);

  res.json(tvSeriesData.tvSeries.slice(0, 5));
});

app.get('/tv-series/:seriesId', (req, res) => {
  res.json(tvSeriesData.tvSeries.find((it) => it.id === req.params.seriesId));
});

app.get('/tv-series/:seriesId/poster', (req, res) => {
  res.json({ url: req.url + '/img/poster.jpg' });
});

app.get('/tv-series/:seriesId/poster', (req, res) => {
  res.json({ url: req.url + '/img/poster.jpg' });
});

let user: User | undefined;

app.get('/users/:userId', (req, res) => {
  res.json(usersData.filter((it) => it.id === req.params.userId));
});

app.post('/users/:userId/favorite-movies', (req, res) => {
  user ??= usersData.filter(
    (it) => it.id === req.params.userId,
  )[0] as unknown as User;

  const body = JSON.parse(req.body);

  user.favoriteMovies.push(body);

  res.status(200);
});

app.delete('/users/:userId/favorite-movies', (req, res) => {
  user ??= usersData.filter(
    (it) => it.id === req.params.userId,
  )[0] as unknown as User;

  const body = JSON.parse(req.body);

  user.favoriteMovies = user?.favoriteMovies.filter((it) => it.id !== body.id);

  res.status(200);
});

app.listen(port, () => {
  console.info(`[server]: Server is running at http://localhost:${port}`);
});

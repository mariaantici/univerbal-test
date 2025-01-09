import { createAPIUrl } from '@/utils';
import { Movie } from 'domain/movie';
import { type User } from '../../../domain/user';

const apiUrl = createAPIUrl();

export async function addToFavoritesQuery(
  userId: User['id'],
  id: Movie['id'],
): Promise<void> {
  const dto: User['favoriteMovies'][number] = {
    id,
    createdAt: new Date(Date.now()).toISOString(),
  };
  const url = new URL(`/users/${userId}/favorite-movies`, apiUrl);

  await fetch(url, { method: 'POST', body: JSON.stringify(dto), headers: {} });
}

export async function removeFromFavoritesQuery(userId: User['id'], id: string) {
  const url = new URL(`/users/${userId}/favorite-m/${id}`, apiUrl);

  await fetch(url, { method: 'DELETE', body: JSON.stringify({ id }) });
}

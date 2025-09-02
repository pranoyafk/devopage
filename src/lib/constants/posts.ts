export const POST_CONTENT_MAX_LENGTH = 280;
export const POST_CONTENT_MIN_LENGTH = 10;
export const VISIBILITY_VALUES = ['public', 'private', 'followers'] as const;
export type Visibility = (typeof VISIBILITY_VALUES)[number];

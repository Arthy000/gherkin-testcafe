export const BEFORE_PREFIX = 'before';
export const AFTER_PREFIX = 'after';
export const BEFORE_AND_AFTER_PREFIX = 'beforeafter';

export const beforeTags = ['tag1', 'tag2'].map((tagSuffix) => `${BEFORE_PREFIX}${tagSuffix}`);
export const afterTags = ['tag'].map((tagSuffix) => `${AFTER_PREFIX}${tagSuffix}`);
export const bothTags = ['tag'].map((tagSuffix) => `${BEFORE_AND_AFTER_PREFIX}${tagSuffix}`);

import crypto from 'crypto';

export function encrypt(text) {
  if (!text) return null;
  const cipher = crypto.createCipher('aes256', 'disemSecret');
  let crypted = cipher.update(text.toString(), 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

export const maskEmail = (email: string) => {
  if (!email || !email.includes("@")) return email;

  const [localPart, domain] = email.split("@");

  if (localPart.length <= 4) {
    return `${localPart[0]}${"*".repeat(localPart.length - 1)}@${domain}`;
  }

  const visiblePrefix = localPart.slice(0, 4);
  const maskedSection = "*".repeat(localPart.length - 4);

  return `${visiblePrefix}${maskedSection}@${domain}`;
};

//6-digits
export function otpGenerator() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Sets time to 00:00:00 locally
export function adjustDate(date: Date | undefined) {
  if (!date) return null;

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return new Date(Date.UTC(year, month, day)).toISOString();
}

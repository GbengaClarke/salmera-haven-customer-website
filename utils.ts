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

function formatPhoneNumber(phoneNumber) {
  if (phoneNumber.startsWith("0")) {
    phoneNumber = "94" + phoneNumber.substring(1);
  }
  return phoneNumber;
}

module.exports = formatPhoneNumber;

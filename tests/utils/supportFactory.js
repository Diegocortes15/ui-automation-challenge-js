import casual from "casual";

class SupportFactory {
  async addAnnotations(jsonData) {
    this._testInfo.annotations.push({
      type: "testId",
      description: jsonData["testCase"],
    });
    this._testInfo.annotations.push({
      type: "testSummary",
      description: jsonData["testSummary"],
    });
    this._testInfo.annotations.push({
      type: "testDescription",
      description: jsonData["testDescription"],
    });
  }

  async getRandomPositiveNumber(max) {
    return Math.floor(Math.random() * max);
  }

  async jsonToString(list, sortKey) {
    try {
      if (Array.isArray(list) && list.length > 0) {
        // Sort the list based on the specified sortKey
        list.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));

        // Convert the sorted list to a JSON string with desired formatting
        const jsonString = JSON.stringify(list, null, 2);
        return jsonString;
      } else {
        throw new Error("Input is not a valid array of objects.");
      }
    } catch (error) {
      console.error("Error converting to JSON:", error.message);
      return null; // or return an error message
    }
  }

  async getRandomFirstName() {
    return casual._first_name();
  }

  async getRandomLastName() {
    return casual._last_name();
  }

  async getRandomZip() {
    return casual.zip({ digits: 5 | 9 });
  }
}

export default new SupportFactory();

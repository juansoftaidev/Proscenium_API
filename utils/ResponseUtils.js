class ResponseUtils {
  async parseAndLog(response) {
    try {
      const responseBody = JSON.parse(await response.text());
      console.log('🚀👽💻🔥🔥🔥🌈🌈🌈✨✨✨🔧 💻 📊 🎯 📈 💼');
      console.log('Parsed Response Body');
      console.log(responseBody);
      console.log('🚀👽💻🔥🔥🔥🌈🌈🌈✨✨✨🔧 💻 📊 🎯 📈 💼');
      return responseBody;
    } catch (error) {
      console.error('Error parsing respnse:', error.message);
      throw error;
    }
  }
}

export default new ResponseUtils;

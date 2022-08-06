const executeWithLogging = async (func) => {
  try {
    return await func();
  } catch (e) {
    console.log(e.text);
    throw e;
  }
};
export default {
  executeWithLogging,
};

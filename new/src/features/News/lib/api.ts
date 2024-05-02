export const getTopStories = async () => {
    const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
    return await response.json();
  };
  
  export const getStoryById = async (id: number) => {
    const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
    return await storyResponse.json();
  };
  
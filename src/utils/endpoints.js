const key= '13e08b80d4d961490db3c3f770010bb0'

export const requests= {
     trending: `trending/all/week?api_key=${key}`,
     originals: `discover/movie?api_key=${key}&with_networks=213`,
     top_rated: `movie/top_rated?api_key=${key}`,
     action:`discover/movie?api_key=${key}&with_genres=28`,
     comedy:`discover/movie?api_key=${key}&with_genres=35`,
     horror:`discover/movie?api_key=${key}&with_genres=27`,
     romance:`discover/movie?api_key=${key}&with_genres=10749`,
     documentaries:`discover/movie?api_key=${key}&with_genres=10749`
}
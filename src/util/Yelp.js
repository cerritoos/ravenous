const apiKey = 'ew2v31wvhMKgcpy7NA4Jwy2S8jZpm0xVsK0fqV0_8Bo4ynUS77O5S4JD2gHpnPfESC7Sn3wK9qCEwrckwQRGYzYSeTLFMmuiDG3qk_9wfVpXASR3t9-JIEWxMVgFXnYx';
const Yelp = {
  url(term, location, sortBy) {
    return `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`
  },

  search(term, location, sortBy) {
    return fetch(Yelp.url(term, location, sortBy), {
      headers:
        { Authorization: `Bearer ${apiKey}` }
      }).then( response => {
        return response.json();
      }).then( jsonResponse => {
        if(jsonResponse.businesses) {
          return jsonResponse.businesses.map( business => {
            return {
              id: business.id,
              imageSrc: business.image_url,
              name: business.name,
              address: business.location.address1,
              city: business.location.city,
              state: business.location.state,
              zipCode: business.location.zip_code,
              category: business.categories.title,
              rating: business.rating,
              reviewCount: business.review_count
            }
          });
        }
      });
  }
};

export default Yelp;

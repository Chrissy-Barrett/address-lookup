//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const axios = require('axios'); 

//Functions
async function getGridReference(postcode) {
  const url = `https://api.postcodes.io/postcodes/${postcode.replace(/\s/g, "")}`;

  try {
    const response = await axios.get(url);
    const data = response.data.result;

    if (data && data.eastings && data.northings) {
    const   easting = data.eastings;
    const   northing = data.northings;

      console.log(`Postcode: ${postcode}`);
      console.log(`Easting: ${easting}`);
      console.log(`Northing: ${northing}`);

  
      return location = [ easting, northing ];
  
      
    } else {
      console.log(`Error: Could not find grid reference for postcode ${postcode}`);
      return null;
    }

  } catch (error) {
    console.error(`API Request Failed: ${error.message}`);
    return null;
  }
}

router.get('/location', function(req,res){
    req.session.data = [{}]
    res.render('location');
});

router.post('/location', function(req, res) {

  getGridReference(req.session.data.postcode).then(data => {
    req.session.data.location = location
    res.redirect('/results'); 
});

      
});

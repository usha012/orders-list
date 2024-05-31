import {createSlice} from "@reduxjs/toolkit"
const customerSlice = createSlice({
    name :'customer',
    initialState:[
        {
          "id": 10,
          "customer": 11909,
          "customer_profile": {
            "id": 11909,
            "name": "Sita",
            "color": [145, 115, 75],
            "email": "sita_ram@myth.com",
            "pincode": "400001",
            "location_name": "Mumbai, Maharashtra, India",
            "type": "C",
            "profile_pic": null,
            "gst": ""
          }
        },
        {
          "id": 11,
          "customer": 11910,
          "customer_profile": {
            "id": 11910,
            "name": "Lakshmi",
            "color": [34, 139, 34],
            "email": "lakshmi_vishnu@heaven.com",
            "pincode": "600001",
            "location_name": "Chennai, Tamil Nadu, India",
            "type": "B",
            "profile_pic": null,
            "gst": "29AAAPL1234A1Z1"
          }
        },
        {
          "id": 12,
          "customer": 11911,
          "customer_profile": {
            "id": 11911,
            "name": "Krishna",
            "color": [0, 0, 128],
            "email": "krishna_radha@vrindavan.com",
            "pincode": "560001",
            "location_name": "Bengaluru, Karnataka, India",
            "type": "A",
            "profile_pic": null,
            "gst": "29AAAPK1234A1Z2"
          }
        },
        {
          "id": 13,
          "customer": 11912,
          "customer_profile": {
            "id": 11912,
            "name": "Radha",
            "color": [255, 20, 147],
            "email": "radha_krishna@brindavan.com",
            "pincode": "110001",
            "location_name": "New Delhi, Delhi, India",
            "type": "C",
            "profile_pic": null,
            "gst": ""
          }
        },
        {
          "id": 14,
          "customer": 11913,
          "customer_profile": {
            "id": 11913,
            "name": "Hanuman",
            "color": [255, 165, 0],
            "email": "hanuman_sankatmochan@ayodhya.com",
            "pincode": "410001",
            "location_name": "Pune, Maharashtra, India",
            "type": "B",
            "profile_pic": null,
            "gst": "27AAAAH1234A1Z3"
          }
        }
      ]
      

})
export const {addUser} = customerSlice.actions
export default customerSlice
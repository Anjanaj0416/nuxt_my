<!--
https://www.npmjs.com/package/nuxt-gmaps
............
modules: [
 ['nuxt-gmaps', {
      key: 'AIzaSyCHCbq3v4eLFxei1WomkhN-QhVy_eF_kdo',
      //you can use libraries: ['places']
    }]
]
............
npm i nuxt-gmaps
..............
https://developers.google.com/maps/documentation/javascript/examples/circle-simple
-->

<!--
Usage - 
<div class="w-2/3 mx-auto">
      <vmap :locations="geolocations" :center="geocenter" />
    </div>
  .....................  
  import vmap from "~/components/customcontrol/map";
  .....................  
  export default {
  components: {
    vmap,
  },
  data() {
    return {
      geocenter: {
        lat: 6.927079,
        lng: 79.861244,
      },
      geolocations: [{lat: 6.927079, lng: 79.861244, }, { lat: 5.94851, lng: 80.53528,}, { lat: 6.053519, lng: 80.220978, },
      ],
    };
  },
};
  .....................  

-->

<template>
  <section>
    <GMap
      ref="gMap"
      language="en"
      :center="center"
      :zoom="18"
      id="theMap"
      :options="{
        draggable: true,
        fullscreenControl: true,
        zoomControl: true,
      }"
      @loaded="fitBoundsToMarkers"
      @click="handleMapClick"
    >
      <GMapMarker
        v-for="location in locations"
        :key="location"
        :position="getPosition(location)"
        :clickable="true"
        @click="openInfoWindow(location)"
      >
        <GMapInfoWindow>
          <div class="infoWindow" v-show="infoBoxOpen">
            <div class="text-blue-700 font-bold">Company Details</div>
            fddf
            <!--
               <article>
              <hr class="mb-2 border-1 border-blue-700" />
            <div class="flex justify-between">
              <div>Category -</div>
              <div>{{selectedLocation.category}}</div>
            </div>
            <div class="flex justify-between">
              <div>Supplier</div>
              <div>{{selectedLocation.supplier}}</div>
            </div>
            <div class="flex justify-between">
              <div>Banner Size</div>
              <div>{{selectedLocation.banner_size}}</div>
            </div>
            <div class="flex justify-between">
              <div>Fixed Date</div>
              <div>{{selectedLocation.fixed_date}}</div>
            </div>
            <div class="flex justify-between">
              <div>Expire Date</div>
              <div>{{selectedLocation.expire_date}}</div>
            </div>
            <div class="flex justify-between">
              <div>Reflective Sticker</div>
              <div>{{selectedLocation.reflectivesticker}}</div>
            </div>  </article>      -->
          </div>
        </GMapInfoWindow>

        <!-- <GMapInfoWindow
          :position="getPosition(selectedLocation)"
          :opened="infoBoxOpen"
          @closeclick="closeInfoWindow()"
        >
          <div class="infoWindow">
             <article>
            <div class="text-blue-700 font-bold">Banner Details</div>
            <hr class="mb-2 border-1 border-blue-700" />
            <div class="flex justify-between">
              <div>Category -</div>
              <div>{{selectedLocation.category}}</div>
            </div>
            <div class="flex justify-between">
              <div>Supplier</div>
              <div>{{selectedLocation.supplier}}</div>
            </div>
            <div class="flex justify-between">
              <div>Banner Size</div>
              <div>{{selectedLocation.banner_size}}</div>
            </div>
            <div class="flex justify-between">
              <div>Fixed Date</div>
              <div>{{selectedLocation.fixed_date}}</div>
            </div>
            <div class="flex justify-between">
              <div>Expire Date</div>
              <div>{{selectedLocation.expire_date}}</div>
            </div>
            <div class="flex justify-between">
              <div>Reflective Sticker</div>
              <div>{{selectedLocation.reflectivesticker}}</div>
            </div>
          </article>
            
          </div>
        </GMapInfoWindow>-->
        <!-- <gmap-info-window>
          
         
        </gmap-info-window>-->
      </GMapMarker>

      <GMapCircle :options="circleOptions" />
    </GMap>

    available_locations - {{ locations }} <br />
    selectedloc - {{ selectedloc }}
  </section>
</template>

<script>
export default {
  props: [],
  data() {
    return {
      center: { lat: 6.927079, lng: 79.861244 },
      locations: [{ lat: 6.927079, lng: 79.861244 }],
     // isLoaded:false,

      selectedLocation: {},
      infoBoxOpen: false,
      selectedloc: -1,
      circleOptions: {},
      currentLocation: {},
      pins: {
        selected:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAApVBMVEUAAAD/AAD/AADxHCvyGyjzGDHoFy7vGSnwHi3wHSzsGi3uGivuHivrGyvsHCztGyrtHSzuHCvuHSzsHSzsHSvtHCvtHCrtGyvsHCvsHCvtHSztHCvtHCvtHCvuGyvtHCvtHSztGyvtHSvtHCvtHCztHCvsHCvtHCvtHCvtHCvtHCvtHCvtHCvtHCvtHCvtHCvtHCvtHCvtHCvtHCvtHCvtHCv///8Zo6fZAAAANXRSTlMAAQISExUWHyIjKDs8QVJVV1ppe3x+f4KHiJiZmpuxt7vDxMbHys7R4Ont7u/w8fLz9Pb7/qzXrqoAAAABYktHRDZHv4jRAAAAn0lEQVQYGaXBV5KCQABF0eeooxjGnDFnpc13/1uzi7JoQL/Gc/R/v931fr/u5JXSuBK61JVQe/Dy+FNM/kQkyMnpYRnfN1hdOVsgKEqeATZyzsBI1hg4yTkCQ1kj4CBnBQRFyTPAUs4Ay/i+werLKRFTUsyCyFxxFSJlJcx4mSnJuxG6FpTSJtRS2s8Ua5LRm+wOdll9UL3fq/qo2dQ3nvcVIgrnmsRBAAAAAElFTkSuQmCC',
        notSelected:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABHElEQVR42uVVyw4BMRQdC98lsbPwG5YSH+BzWFtLZilh0oQgFh6J54IwBmGYtrfaBREdcTvDhpM0adrec3rb+7Csn8fRdrLg7VzBubhDzmHrudRuZ2KRs/miLd6AThfNaOTTGRFIsMm8bkSuXBeGoLVaGi0g39wLI4GTf1EjdE/+E1pAAGgEAenkb/tBo1vQFUDgBbSbny6al77uSQwB/6wJSNHoAo8xj30iaYMW4Lv9wfSTpc0eH6atXtE4TKWNUS4AY2hyddY4k/lwVEZncm9QilQuBGPwnp1B5GIXGi3P0eU0c7EqKrje5hU5d7fr2P2AEJIESkNqB1XJkvhI0/GrTuqZX619tLMF/VHlfnk5/0r7ZMvVWA3rr3AF6LIMZ7PmSlUAAAAASUVORK5CYII=',
      },
      mapStyle: [],
      clusterStyle: [
        {
          url: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png',
          width: 56,
          height: 56,
          textColor: '#fff',
        },
      ],
    }
  },
  methods: {
    fitBoundsToMarkers(google) {
      // const bounds = new google.maps.LatLngBounds() // creates a bounds object
      // this.$refs.gMap.markers.forEach((marker) =>
      //   bounds.extend(marker.getPosition())
      // ) // adds all the markers to the bounds object, you can filter it if you need that
      // this.$refs.gMap.map.fitBounds(bounds, { left: 400 }) // fitBounds, you can also add padding, I have a left padding of 400px here
    },
    checkForMarkers() {
      //  this.locations.forEach((location, i) => {
      //         location.visible = this.$refs.gMap.map
      //         .getBounds()
      //         .contains(this.$refs.gMap.markers[i].getPosition());
      //     });
      //     this.locationsVisibleOnMap = this.locations
      //         .filter((l) => l.visible)
      //         .map((l) => l.name)
      //         .join(", ");
    },

    getPosition: function (location) {
      return {
        lat: parseFloat(location.lat),
        lng: parseFloat(location.lng),
      }
    },
    openInfoWindow(location) {
      // console.log(location)
      //this.currentLocation = location
      //this.selectedloc = location.id
      //this.selectedLocation = location
      //this.infoBoxOpen = true
    },
    closeInfoWindow() {

      //this.infoBoxOpen = false
    },
    handleMapClick(e) {
      //this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
     // this.isLoaded =false;
      this.locations[0] = {
        lat: e.event.latLng.lat(),
        lng: e.event.latLng.lng(),    
      }
     // this.isLoaded =true;
      
      //this.$refs.gMap.zoom = 10;
         //this.$refs.gMap.initMap();
        // this.$refs.gMap.panTo(this.locations);
         
      //this.fitBoundsToMarkers(new google());
      //this.panToMarker( this.locations)
      // let map = this.$refs.mapRef
      // map.setZoom(15)
      
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.locations[0] = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
       // this.isLoaded =true;
        this.center = this.locations[0]
       // this.panToMarker()
        
      })
    },
    panToMarker() {
      //this.$refs.gMap.(this.locations)
    },
    refresh() {
      // let map = new google.maps.Map(document.getElementById('theMap'))
      //map.setZoom(7);
    },
    // showmap() {
    //   this.map = new google.maps.Map(document.getElementById(this.theMap), {
    //     center:this.center, lng: this.latLong.longitude },
    //   })
    // },
  },
  mounted() {
    this.geolocate()  
    // setInterval(
    //   function () {
    //     this.locations.forEach((location) => {
    
    //     })
     
    //   }.bind(this),
    //   2000
    // )
  
  },
  watch: {},
}
</script>

<style>
.gm-style .gm-style-iw-c {
  width: 320px !important;
}
</style>
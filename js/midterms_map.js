legend_info = {"prop_8_regulates_kidney_dialysis_clinics": [["YES", "NO"], [1, 0]], "measure_b-_san_diego_county_ch._amd._rep._uninc._areas": [["YES", "NO"], [1, 0]], "prop_11_private-sector_emer._ambulance": [["NO", "YES"], [0, 1]], "measure_m-_city_of_san_diego_ch._amd._appt._audit_com": [["YES", "NO"], [1, 0]], "superintendent_of_public_instruction": [["MARSHALL TUCK", "TONY K. THURMOND"], [2, 4]], "attorney_general": [["STEVEN C BAILEY", "XAVIER BECERRA"], [3, 2]], "measure_e-_city_of_san_diego_soccer_city": [["YES", "NO"], [1, 0]], "prop_4_authorizes_bonds_funding_const._hosp.": [["NO", "YES"], [0, 1]], "measure_l-_city_of_san_diego_ch._amd._ethics-comp.": [["YES", "NO"], [1, 0]], "prop_1_authorizes_bonds_to_fund_housing_pgms": [["NO", "YES"], [0, 1]], "measure_c-_san_diego_county_ch._amd._good_govt.": [["YES", "NO"], [1, 0]], "us_representative_49th_dist_(san_diego_portion_only)": [["DIANE L. HARKEY", "MIKE LEVIN"], [3, 2]], "measure_j-_city_of_san_diego_ch._amd._disc._business_interest": [["NO", "YES"], [0, 1]], "measure_k-_city_of_san_diego_ch._amd._limit_2-four_yr_trms": [["NO", "YES"], [0, 1]], "treasurer": [["FIONA MA", "GREG CONLON"], [2, 3]], "prop_3_authorizes_bonds_fund_projects_wtr": [["YES", "NO"], [1, 0]], "prop_7_daylight_saving_time": [["NO", "YES"], [0, 1]], "prop_6_eliminates_road_repair/trans._funding": [["NO", "YES"], [0, 1]], "measure_n-_city_of_san_diego_reinstate_disability_retirement_p.o.": [["YES", "NO"], [1, 0]], "measure_d-_san_diego_county_ch._amd._req._run-off_elects.": [["YES", "NO"], [1, 0]], "board_of_supervisors_district_no._4": [["BONNIE DUMANIS", "NATHAN FLETCHER"], [3, 2]], "measure_h-_sd_un_schl_dist_term_limits": [["YES", "NO"], [1, 0]], "controller": [["BETTY T. YEE", "KONSTANTINOS RODITIS"], [2, 3]], "measure_a-_san_diego_county_ch._amd._\"clean-up\"": [["YES", "NO"], [1, 0]], "measure_yy-_sd_un_schl_dist_$3.5b_bonds_(req_55%)": [["YES", "NO"], [1, 0]], "measure_g-_city_of_san_diego_sdsu_west": [["YES", "NO"], [1, 0]], "lieutenant_governor": [["ELENI KOUNALAKIS", "ED HERNANDEZ"], [4, 2]], "prop_5_changes_req._certain_property_owners": [["NO", "YES"], [0, 1]], "prop_10_enact_rent_control": [["NO", "YES"], [0, 1]], "prop_12_establishes_new_standards_farm_animals": [["YES", "NO"], [1, 0]], "state_assembly_78th_dist": [["TODD GLORIA", "MAGGIE J. CAMPBELL"], [2, 3]], "governor": [["GAVIN NEWSOM", "JOHN H. COX"], [2, 3]], "us_representative_52nd_dist": [["SCOTT PETERS", "OMAR QUDRAT"], [2, 3]], "united_states_senator": [["DIANNE FEINSTEIN", "KEVIN DE LEON"], [4, 2]], "prop_2_authorizes_bonds_to_fund_exist._housing_pgm": [["YES", "NO"], [1, 0]], "insurance_commissioner": [["STEVE POIZNER", "RICARDO LARA"], [5, 2]]}

/**var treeData;

var oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.open("get", "yourFile.txt", true);
oReq.send();

function reqListener(e) {
    treeData = JSON.parse(this.responseText);
}
**/

legend_colors = ["red", "green", "#1DAFF0", "#D61C27", "#3333FF"]

function draw_precints(map, initial_draw) {
  // get the selected element for the race id and display name
  slct_elecment = document.getElementById('slct')
  race = (slct_elecment[slct_elecment.selectedIndex].value)
  race_display = slct_elecment[slct_elecment.selectedIndex].text

  // remove the current precinct winner colors
  if(initial_draw != 1) { 
    map.removeLayer("precinct-fills")
    document.getElementById("legend").innerHTML = "";
  }

  // add new precinct cand_names with corresponding colors
  map.addLayer({
    "id": "precinct-fills",
    "type": "fill",
    "source": "turnout_stats",
    "paint": {
      "fill-color": [
        "match",
        ["get", race + "_color"],
        "0", "red",
        "1", "green",
        "2", "#1DAFF0",
        "3", "#D61C27",
        "4", "#3333FF",
        "black"
      ],
      "fill-opacity": 0.5
    },
  },  "precinct-borders");

  var cand_names = legend_info[race][0];
  var colors = legend_info[race][1];

  for (i = 0; i < cand_names.length; i++) {
    var layer = cand_names[i];
    var color = legend_colors[colors[i]];
    var item = document.createElement('div');
    var key = document.createElement('span');
    key.className = 'legend-key';
    key.style.backgroundColor = color;

    var value = document.createElement('span');
    value.innerHTML = layer;
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
  }
}

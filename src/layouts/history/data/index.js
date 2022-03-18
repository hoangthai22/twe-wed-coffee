/* eslint-disable react/prop-types */

// Soft UI Dashboard React components
// Images
// import logoXD from "assets/images/small-logos/logo-xd.svg";
// import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
// import logoSlack from "assets/images/small-logos/logo-slack.svg";
// import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
// import logoJira from "assets/images/small-logos/logo-jira.svg";
// import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import axios from "axios";
import MDAvatar from "components/MDAvatar";
import Tooltip from "@mui/material/Tooltip";
import MDBadge from "components/MDBadge";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useEffect, useState } from "react";

export const Author = ({ image, name }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1} p={1}>
    <MDAvatar src={image} name={name} size="lg" />
    <MDBox ml={2} lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium" fontSize="15px">
        {name}
      </MDTypography>
    </MDBox>
  </MDBox>
);

export const Avatars = ({ image }) => (
  <Tooltip placeholder="bottom">
    <MDAvatar
      src={image}
      size="sm"
      sx={{
        border: ({ borders: { borderWidth }, palette: { white } }) =>
          `${borderWidth[1]} solid ${white.main}`,
        cursor: "pointer",
        position: "relative",

        "&:not(:first-of-type)": {
          ml: -1,
        },

        "&:hover, &:focus": {
          zIndex: "10",
        },
      }}
    />
  </Tooltip>
);

export default function data() {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    axios
      .get("https://theweekendexpertise.azurewebsites.net/history?pageIndex=1&pageSize=5")
      .then((res) => {
        console.log(res.data);
        console.log(history);
        setHistory(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  function dataTable() {
    return history.map((item, index) => ({
      stt: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
          fontSize="15px"
        >
          {index + 1}
        </MDTypography>
      ),
      mentor: <Author image={item.mentorImage} name={item.mentorName} />,
      member: (
        <MDBox display="flex" py={2}>
          <Avatars image={item.listMemberImage} />
        </MDBox>
      ),
      price: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
          fontSize="15px"
        >
          {item.price} VND
        </MDTypography>
      ),

      location: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
          fontSize="15px"
        >
          {item.cafeName}
        </MDTypography>
      ),
      date_time: (
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
          fontSize="15px"
        >
          {item.date}
        </MDTypography>
      ),
      status: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={item.status ? "Confirm" : "2"}
            color="success"
            variant="gradient"
            size="sm"
            fontSize="15px"
          />
        </MDBox>
      ),
    }));
  }

  return {
    columns: [
      { Header: "STT", accessor: "stt", align: "left" },
      { Header: "Mentor", accessor: "mentor", width: "20%", align: "left" },
      { Header: "Thành viên", accessor: "member", width: "20%", align: "left" },
      { Header: "Ngày giờ", accessor: "date_time", align: "center" },
      { Header: "Trạng thái", accessor: "status", align: "center" },
    ],

    rows: dataTable(),
  };
}

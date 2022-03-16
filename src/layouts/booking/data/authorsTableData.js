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
import Tooltip from "@mui/material/Tooltip";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { useEffect, useState } from "react";

export const Author = ({ image, name }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1} p={1}>
    <MDAvatar src={image} name={name} size="sm" />
    <MDBox ml={2} lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium">
        {name}
      </MDTypography>
    </MDBox>
  </MDBox>
);
// export const Job = ({ title, description }) => (
//   <MDBox lineHeight={1} textAlign="left">
//     <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
//       {title}
//     </MDTypography>
//     <MDTypography variant="caption">{description}</MDTypography>
//   </MDBox>
// );

// function getMajorString(majorList) {
//   let majors = "";
//   // eslint-disable-next-line array-callback-return
//   majorList.map((major) => {
//     // eslint-disable-next-line eqeqeq
//     if (majors != "") {
//       majors = `${majors}, ${major}`;
//     } else {
//       majors = major;
//     }
//   });

//   return majors;
// }
export const Avatars = ({ image }) => (
  <Tooltip placeholder="bottom">
    <MDAvatar
      src={image}
      size="xs"
      sx={{
        border: ({ borders: { borderWidth }, palette: { white } }) =>
          `${borderWidth[2]} solid ${white.main}`,
        cursor: "pointer",
        position: "relative",

        "&:not(:first-of-type)": {
          ml: -1.25,
        },

        "&:hover, &:focus": {
          zIndex: "10",
        },
      }}
    />
  </Tooltip>
);

export default function data() {
  const [meeting, setMeeting] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://theweekendexpertise.azurewebsites.net/api/v1/cafe/sessions/listRq?pageIndex=1&pageSize=5"
      )
      .then((res) => {
        // const mentors = res.data;
        // // eslint-disable-next-line array-callback-return
        // mentors.map((item) => {
        //   // eslint-disable-next-line no-param-reassign
        //   item.listMajor = getMajorString(item.listMajor);
        //   const day = item.birthday.split(" ")[0];
        //   // eslint-disable-next-line no-param-reassign
        //   item.birthday = day;
        // });
        console.log(res.data);
        console.log(meeting);
        setMeeting(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  function dataTable() {
    return meeting.map((item, index) => ({
      stt: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {index + 1}
        </MDTypography>
      ),
      session: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.subjectName}
        </MDTypography>
      ),
      member: (
        <MDBox display="flex" py={2}>
          <Avatars image={item.listMemberImage} />
        </MDBox>
      ),
      mentor: <Author image={item.mentorImage} name={item.mentorName} />,
      price: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.price}.000 VND
        </MDTypography>
      ),

      location: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.cafeStreet}, {item.cafeDistric}
        </MDTypography>
      ),
      date_time: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.date}
        </MDTypography>
      ),
      status: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={item.status ? "Request" : "2"}
            color="white"
            variant="gradient"
            size="sm"
          />
        </MDBox>
      ),
      action: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          <MDButton color="success">Confirm</MDButton>
          <MDButton color="error">Cancel</MDButton>
        </MDTypography>
      ),
    }));
  }

  return {
    columns: [
      { Header: "STT", accessor: "stt", width: "5%", align: "left" },
      { Header: "Session", accessor: "session", align: "left" },
      { Header: "Mentor", accessor: "mentor", width: "20%", align: "left" },
      { Header: "Thành viên", accessor: "member", width: "20%", align: "left" },
      { Header: "Ngày giờ", accessor: "date_time", align: "center" },
      { Header: "Trạng thái", accessor: "status", align: "center" },
      { Header: "Thao tác", accessor: "action", align: "center" },
    ],

    rows: dataTable(),
  };
}

import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineNewLabel } from 'react-icons/md';
import { ImAttachment } from 'react-icons/im';
import { SiAutomattic } from 'react-icons/si';
import { SlFolderAlt } from 'react-icons/sl';
import WebOutlinedIcon from '@mui/icons-material/WebOutlined';
import style from "./DescriptionRightSection.module.css"
import CreditScoreSharpIcon from '@mui/icons-material/CreditScoreSharp';
import QueryBuilderSharpIcon from '@mui/icons-material/QueryBuilderSharp';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import TrendingFlatOutlinedIcon from '@mui/icons-material/TrendingFlatOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
const arrs = [
  {
    icon: <CgProfile />,
    text: "Members"
  },
  {
    icon: <MdOutlineNewLabel />,
    text: "Labels",
  },
  {
    icon: <CreditScoreSharpIcon />,
    text: "Checklist"
  },
  {
    icon: <QueryBuilderSharpIcon />,
    text: "Dates",
  },

  {
    icon: <ImAttachment />,
    text: "Attachment ",
  },
  {
    icon: <WebOutlinedIcon />,
    text: "Cover",
  },
  {
    icon: <SlFolderAlt />,
    text: "Custom fields",
  },

];

const array = [
  {
    icons: <TrendingFlatOutlinedIcon />,
    text: "Move"
  },
  {
    icons: <ContentCopyOutlinedIcon />,
    text: "copy",
  },
  {
    icons: <CreditScoreSharpIcon />,
    text: "Make Template"
  },
  {
    icons: <ArchiveOutlinedIcon />,
    text: "Archieve",
  },
  {
    icons: <ShareOutlinedIcon />,
    text: "Share ",
  },


];

function DescriptionRightSection() {

  return (
    <>
      <div className={style.mainDiv}>
        <div className={style.btnDiv}>
          <p className={style.pTag}> Add to card</p>
          <div className={style.buttons}>
            {arrs.map((arr, index) => (
              <div key={index} style={{ width: "100%", marginBottom : ".5rem" }} title={arr.text}>
                <button className={style.icons}>
                  {arr.icon}
                  {arr.text}
                </button>
              </div>
            )
            )}
            <p className={style.p2Tag}> Power-ups</p>
            <div style={{ width: "100%" }} title="Add Power-ups">
              <button className={style.btn2}>
                <AddOutlinedIcon
                  style={{
                    color: "#44546F",
                    fontSize: "x-large",
                  }}
                />Add Power-ups</button>
            </div>

            <div className={style.Auto}>
              <p>Automation</p>
              <SiAutomattic />
            </div>

            <div style={{ width: "100%" }} title="Add Button">
              <button className={style.btn2}>
                <AddOutlinedIcon
                  style={{
                    color: "#44546F",
                    fontSize: "x-large",
                  }}
                />Add Button</button></div>

            <p className={style.p2Tag}>Actions</p>
            {array.map((arr, index) => (
              <div key={index} style={{ width: "100%", marginBottom : ".5rem"  }} title={arr.text}>
              <button className={style.icons}>
                {arr.icons}
                {arr.text}
              </button>
            </div>
            ))}
          </div>
        </div>
      </div>

    </>
  );
}
export default DescriptionRightSection;
import React from "react";

const Tabs = ({ TabInfo }) => {
  let constructedTabs = "";
  for (let index = 0; index < TabInfo.titles.length; index++) {
    if(TabInfo.active===index) {
      constructedTabs = constructedTabs + '<div className="col-med"> <a class="list-group-item list-group-item-action active" data-toggle="list" href="'+TabInfo.hrefs[index]+'" role="tab" >'+TabInfo.titles[index]+' </a> </div>';
    } else {
      constructedTabs = constructedTabs + '<div className="col-med"> <a class="list-group-item list-group-item-action" data-toggle="list" href="'+TabInfo.hrefs[index]+'" role="tab" >'+TabInfo.titles[index]+' </a> </div>';
    }
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="list-group flex-row" id="list-tab" role="tablist">

            <div dangerouslySetInnerHTML={{ __html: constructedTabs }} />

            </div>
          </div>
      </div>
    </>

  );
      

};
export default Tabs;
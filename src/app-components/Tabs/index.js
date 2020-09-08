import React from "react";

const Tabs = ({ TabInfo }) => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="list-group flex-row" id="list-tab" role="tablist" aria-orientation="horizontal">

            <div className="tab-manager">
              {TabInfo.tabList.map(({ name, url }) => (
                <div class="col-med">
                <a className={`list-group-item list-group-item-action ${name === TabInfo.activeTab ? ' active' : ''}`} data-toggle="list" role="tab" href={url} >{name}</a> 
                </div>
              ))}
            </div>

            </div>
          </div>
      </div>
    </>
  );
};
export default Tabs;
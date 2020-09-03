import React from "react";

const Tabs = ({ TabInfo }) => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="list-group flex-row" id="list-tab" role="tablist" aria-orientation="horizontal">

            <div className="tab-manager">
              {TabInfo.hrefs.map(({ label, value }) => (
                <div class="col-med">
                <a className={`list-group-item list-group-item-action ${value === TabInfo.activeTab ? ' active' : ''}`} data-toggle="list" role="tab" href={label} >{value}</a> 
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
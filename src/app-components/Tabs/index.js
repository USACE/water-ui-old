import React from "react";

const Tabs = ({ TabInfo }) => {
  return (
    <>
      <div className="container">
        <div className="row">
          <ul class="list-group list-group-horizontal-sm flex-row" id="list-tab" role="tablist">
              {TabInfo.tabLinks.map(({ name, url }) => (
                <div class="col-med">
                <a class={`list-group-item list-group-item-action ${name === TabInfo.activeTab ? ' active' : ''}`} data-toggle="list" role="tab" href={url} >{name}</a> 
                </div>
              ))}
            </ul>
          </div>
      </div>
    </>
  );
};
export default Tabs;
import React from "react";

const inlinePill = {
  marginLeft: '0.5rem'
}

const TabLinks = ({ TabInfo }) => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <ul className="list-group list-group-horizontal flex-row" id="list-tab" role="tablist">
              {TabInfo.tabLinks.map(({ name, url }) => (
                <div key={ name }>
                  <a className={`list-group-item list-group-item-action ${name === TabInfo.activeTab ? ' active' : ''}`} data-toggle="list" role="tab" href={url} >{name}
                    {TabInfo.tabLinks.length === 3 ? <span className="badge badge-pill badge-dark" style={ inlinePill }>0</span> : ''}
                  </a>
                </div>
              ))}
            </ul>
          </div>
      </div>
    </>
  );
};
export default TabLinks;

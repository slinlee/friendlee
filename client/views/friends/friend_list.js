
Template.friendlist.friends = function () {
  return Friends.find(Session.get("searchFilter"), Session.get("sortOrder"));

};

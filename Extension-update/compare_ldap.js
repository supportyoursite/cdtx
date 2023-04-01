


// Compare ldap
var _ldap = document.querySelector('profile-icon img.photo').src.split('/');
_ldap = _ldap[_ldap.length - 1].split('?')[0];
var _userassigneer = document.querySelector('[debug-id="assignee"]').innerText.replace(/[^a-z]/g,'');

console.log(_ldap === _userassigneer);
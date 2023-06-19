var snips = [
  {
    "name": "Integration",
    "symbol": "IK",
    "entries": [
      {
        "name": "Query All",
        "action": "copy",
        "action_copy": "TEST1"
      }
    ]
  },
  {
    "name": "Integration",
    "symbol": "IK",
    "entries": [
      {
        "name": "Query All",
        "action": "copy",
        "action_copy": "TEST1"
      }
    ]
  },
  {
    "name": "Integration",
    "symbol": "IK",
    "entries": [
      {
        "name": "Query All",
        "action": "copy",
        "action_copy": "TEST1"
      }
    ]
  }
]

function generateActions(entries) {
  let response = "";
  for (entry in entries)
    response += `<li` 
      + ` data-action="` + entries[entry].action + `" `
      + ` data-action_copy="` + entries[entry].action_copy + `" `
      +`>` 
      + entries[entry].name 
      + `</li>`;
  return response;
}

function generateBtns(snips) {
  let response = "";
  for (snip in snips) {
    response += `<li><a class="CS-Submenu CS-Submenu-btn animation-transition animation-outin">`
      + snips[snip].symbol
      + `</a><div class="CS-Actions animation-transition animation-outin">
      <ul>
        `+generateActions( snips[snip].entries ) +`
      </ul>
    </div></li>`;
  }
  return response;
}



var menuRoot = document.createElement('div');
menuRoot.classList.add('CS-Menu');
menuRoot.innerHTML =
  `
  <style>
  .CS-Submenu {
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #009688;
    vertical-align: middle;
    text-decoration: none;
    text-align: center;
    transition: 0.2s ease-out;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    color: #FFF;
  }
  
  .CS-Submenu:hover {
    background-color: #4db6ac;
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.14), 0 1px 7px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -1px rgba(0, 0, 0, 0.2);
  }
  
  .zoom-btn-large {
    width: 30px;
    height: 30px;
    line-height: 30px;
    font-size: 10px;
  }
  
  .CS-Submenus {
    position: absolute;
    right: 30px;
    left: auto;
    top: 50%;
    transform: translateY(-50%);
    height: 100%;
    width: 500px;
    list-style: none;
    text-align: right;

    line-height: 30px;
    font-size: 10px;
  }
  
  .CS-Submenus li {
    display: inline-block;
    margin-right: 5px;
    
  }
  
  .CS-Actions {
    position: absolute;
    right: -30px;
    bottom: 35px;
    transition: box-shadow 0.25s;
    padding: 0px 5px;
    border-radius: 2px;
    background-color: #009688;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
    color: #FFF;
  }
  
  .CS-Actions ul {
    -webkit-padding-start: 0;
    list-style: none;
    text-align: left;
  }

  .CS-Actions ul li {
    display: block;
    list-style: none;
    text-align: left;
  }

  .animation-transition { transition: transform 0.3s cubic-bezier(0.53, 0.01, 0.36, 1.63) !important; }

.animation-transition.animation-outin {
  transform: scale(0);
  transition: transform 0.2s !important;
}

.animation-transition.scale-in { transform: scale(1); }
  </style>
  <a class="CS-Submenu zoom-btn-large" id="CSMenu">📁</a>
  <ul class="CS-Submenus">
    `+ generateBtns(snips) + `
  </ul>
`
menuRoot.style.cssText = `
  position: fixed;
  bottom: 10px;
  right: 10px;
  height: 30px;
  `;

document.body.appendChild(menuRoot);

document.querySelector("#CSMenu").addEventListener("click", () => {
  document.querySelectorAll('.CS-Submenu-btn').forEach(element => {
    element.classList.toggle('animation-outin');
  });
  if (!document.querySelector('.CS-Actions').classList.contains('animation-outin')) {
    document.querySelector('.CS-Actions').classList.toggle('animation-outin');
  }
})


document.querySelectorAll('.CS-Submenu-btn').forEach(element => {
  element.addEventListener("click", function (event) {
    var btn = event.target.parentNode;
    var card = btn.querySelector('.CS-Actions');
    card.classList.toggle('animation-outin');
  })
});


document.querySelectorAll('li[data-action="copy"]').forEach(element => {
  element.addEventListener("click", function (event) {
    var btn = event.target;
    try {
      navigator.clipboard.writeText(btn.dataset.action_copy).then(
        () => {console.log('Content copied to clipboard');}
      );
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  })
});

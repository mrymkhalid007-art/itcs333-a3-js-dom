// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

(function () {
  'use strict';

  function init() {
    var form = document.getElementById('todo-form');
    var input = document.getElementById('todo-input');
    var list = document.getElementById('todo-list');
    var errorMsg = document.getElementById('error-msg');
    var counter = document.getElementById('counter');
    var currentFilter = 'all';

    function updateCounter() {
      var left = 0;
      for (var i = 0; i < list.children.length; i++) {
        if (!list.children[i].classList.contains('completed')) {
          left++;
        }
      }
      counter.textContent = left + ' item(s) left';
    }

    function applyFilter() {
      for (var i = 0; i < list.children.length; i++) {
        var li = list.children[i];
        var done = li.classList.contains('completed');
        var show =
          currentFilter === 'all' ||
          (currentFilter === 'active' && !done) ||
          (currentFilter === 'done' && done);
        li.style.display = show ? '' : 'none';
      }
    }

    function refresh() {
      applyFilter();
      updateCounter();
    }

    function addItem() {
      var text = input.value.trim();
      if (text === '') {
        errorMsg.classList.remove('hidden');
        return;
      }
      errorMsg.classList.add('hidden');

      var li = document.createElement('li');

      var span = document.createElement('span');
      span.className = 'item-text';
      span.textContent = text;

      var del = document.createElement('button');
      del.type = 'button';
      del.className = 'delete-btn';
      del.textContent = 'Delete';

      li.appendChild(span);
      li.appendChild(del);
      list.appendChild(li);

      input.value = '';
      refresh();
    }

    list.addEventListener('click', function (e) {
      var li = e.target.closest('li');
      if (!li || !list.contains(li)) return;

      if (e.target.closest('.delete-btn')) {
        li.remove();                       
      } else {
        li.classList.toggle('completed');  
      }
      refresh();
    });

    
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      addItem();
    });

    function bindFilter(id, name) {
      document.getElementById(id).addEventListener('click', function () {
        currentFilter = name;
        refresh();
      });
    }
    bindFilter('filter-all', 'all');
    bindFilter('filter-active', 'active');
    bindFilter('filter-done', 'done');

    refresh();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
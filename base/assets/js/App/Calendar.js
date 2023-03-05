(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/App/Calendar', ['exports', 'Site', 'Config'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('Site'), require('Config'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Site, global.Config);
    global.AppCalendar = mod.exports;
  }
})(this, function (exports, _Site2, _Config) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getInstance = exports.run = exports.AppCalendar = undefined;

  var _Site3 = babelHelpers.interopRequireDefault(_Site2);

  var AppCalendar = function (_Site) {
    babelHelpers.inherits(AppCalendar, _Site);

    function AppCalendar() {
      babelHelpers.classCallCheck(this, AppCalendar);
      return babelHelpers.possibleConstructorReturn(this, (AppCalendar.__proto__ || Object.getPrototypeOf(AppCalendar)).apply(this, arguments));
    }

    babelHelpers.createClass(AppCalendar, [{
      key: 'initialize',
      value: function initialize() {
        babelHelpers.get(AppCalendar.prototype.__proto__ || Object.getPrototypeOf(AppCalendar.prototype), 'initialize', this).call(this);

        this.$actionToggleBtn = $('.site-action-toggle');
        this.$addNewCalendarForm = $('#addNewCalendar').modal({
          show: false
        });
      }
    }, {
      key: 'process',
      value: function process() {
        babelHelpers.get(AppCalendar.prototype.__proto__ || Object.getPrototypeOf(AppCalendar.prototype), 'process', this).call(this);

        this.handleFullcalendar();
        this.handleSelective();
        this.handleAction();
        this.handleListItem();
        this.handleEventList();
        this.handleModalEvent();
      }
    }, {
      key: 'handleFullcalendar',
      value: function handleFullcalendar() {
        var myEvents = [{
          title: 'All Day Event',
          start: '2023-03-10'
        }, {
          title: 'Long Event',
          start: '2023-03-17',
          end: '2023-03-17',
          backgroundColor: (0, _Config.colors)('cyan', 600),
          borderColor: (0, _Config.colors)('cyan', 600)
        }, {
          id: 999,
          title: 'Repeating Event',
          start: '2023-03-09T16:00:00',
          backgroundColor: (0, _Config.colors)('red', 600),
          borderColor: (0, _Config.colors)('red', 600)
        }, {
          title: 'Conference',
          start: '2023-03-18',
          end: '2023-03-20'
        }, {
          title: 'Meeting',
          start: '2023-03-22T10:30:00',
          end: '2023-03-22T12:30:00'
        }, {
          title: 'Lunch',
          start: '2023-03-21T12:00:00'
        }, {
          title: 'Meeting',
          start: '2023-03-19T09:30:00',
          end: '2023-03-19T11:30:00'
        }, {
          title: 'Happy Hour',
          start: '2023-03-22T17:30:00',
          end: '2023-03-22T19:30:00'
        }, {
          title: 'Dinner',
          start: '2023-03-19T18:00:00',
          end: '2023-03-19T20:00:00'
        }, {
          title: 'Birthday Party',
          start: '2023-03-20T07:00:00',
          end: '2023-03-20T09:00:00'
        }];

        var myOptions = {
          header: {
            left: null,
            center: 'prev,title,next',
            right: 'month,agendaWeek,agendaDay'
          },
          defaultDate: '2023-03-20',
          defaultView: 'agendaWeek', 
          // height: $(window).height()*0.8,
          selectable: true,
          selectHelper: true,
          select: function select(start_date, end_date, jsEvent, view) {
            $('#addNewEvent #ename').val('');
            $('#addNewEvent #starts').val('');
            $('#addNewEvent #ends').val('');
            $('#addNewEvent #starts').val(moment(start_date).format('YYYY-MM-DD HH:mm'));
            $('#addNewEvent #ends').val(moment(end_date).format('YYYY-MM-DD HH:mm'));
            
            $('#addNewEvent').modal('show');

            $('#addNewEvent.modal .form-actions #btn-add-event').one('click', function(e){
                var $modal = $(this).closest('.modal');
                var event = {}
                event.title = $modal.find('input#ename').val();
                if(event.title == '')
                  return;
                event.start = moment($('#addNewEvent #starts').val()).format();
                event.end = moment($('#addNewEvent #ends').val()).format();
                
                $('#calendar').fullCalendar('renderEvent', event);
                
            });
          },

          editable: true,
          eventLimit: true,
          windowResize: function windowResize(view) {
            var width = $(window).outerWidth();
            var options = Object.assign({}, myOptions);

            options.events = view.calendar.clientEvents();
            options.aspectRatio = width < 667 ? 0.5 : 1.35;
            // options.height = $(window).outerHeight()*0.8;

            $('#calendar').fullCalendar('destroy');
            $('#calendar').fullCalendar(options);
          },
          eventClick: function eventClick(event) {
            var color = event.backgroundColor ? event.backgroundColor : (0, _Config.colors)('blue', 600);
            $('#editEname').val(event.title);

            if (event.start) {
              $('#editNewEvent-datetimepicker-editStarts').datetimepicker('date',moment(event.start, 'YYYY-MM-DD HH:mm'));
              // $('#editStarts').datepicker('update', event.start._d);
            } else {
              // $('#editStarts').datepicker('update', '');
            }
            if (event.end) {
              $('#editNewEvent-datetimepicker-editEnds').datetimepicker('date',moment(event.end, 'YYYY-MM-DD HH:mm'));
            } else {
              // $('#editEnds').datepicker('update', '');
            }

            $('#editColor [type=radio]').each(function () {
              var $this = $(this),
                  _value = $this.data('color').split('|'),
                  value = (0, _Config.colors)(_value[0], _value[1]);
              if (value === color) {
                $this.prop('checked', true);
              } else {
                $this.prop('checked', false);
              }
            });

            $('#editNewEvent').modal('show').one('hidden.bs.modal', function (e) {
              event.title = $('#editEname').val();

              var color = $('#editColor [type=radio]:checked').data('color').split('|');
              color = (0, _Config.colors)(color[0], color[1]);
              event.backgroundColor = color;
              event.borderColor = color;

              // event.start = new Date($('#editStarts').data('datepicker').getDate());
              // event.end = new Date($('#editEnds').data('datepicker').getDate());

              // event.start = moment.utc($('#editNewEvent-datetimepicker-editStarts').datetimepicker('viewDate')).format();
              // event.end = moment.utc($('#editNewEvent-datetimepicker-editEnds').datetimepicker('viewDate')).format();
              event.start = moment.utc($('#editStarts').val()).format();
              event.end = moment.utc($('#editEnds').val()).format();
              $('#calendar').fullCalendar('updateEvent', event);
            });
          },
          eventDragStart: function eventDragStart() {
            $('.site-action').data('actionBtn').show();
          },
          eventDragStop: function eventDragStop() {
            $('.site-action').data('actionBtn').hide();
          },

          events: myEvents,
          droppable: true
        };

        var _options = void 0;
        var myOptionsMobile = Object.assign({}, myOptions);

        myOptionsMobile.aspectRatio = 0.5;
        _options = $(window).outerWidth() < 667 ? myOptionsMobile : myOptions;

        $('#editNewEvent').modal();
        $('#calendar').fullCalendar(_options);
      }
    }, {
      key: 'handleSelective',
      value: function handleSelective() {

        var member = [{
          id: 'uid_1',
          name: 'Herman Beck',
          avatar: '../../../../global/portraits/1.jpg'
        }, {
          id: 'uid_2',
          name: 'Mary Adams',
          avatar: '../../../../global/portraits/2.jpg'
        }, {
          id: 'uid_3',
          name: 'Caleb Richards',
          avatar: '../../../../global/portraits/3.jpg'
        }, {
          id: 'uid_4',
          name: 'June Lane',
          avatar: '../../../../global/portraits/4.jpg'
        }];

        var items = [{
          id: 'uid_1',
          name: 'Herman Beck',
          avatar: '../../../../global/portraits/1.jpg'
        }, {
          id: 'uid_2',
          name: 'Caleb Richards',
          avatar: '../../../../global/portraits/2.jpg'
        }];

        $('.plugin-selective').selective({
          namespace: 'addMember',
          local: member,
          selected: items,
          buildFromHtml: false,
          tpl: {
            optionValue: function optionValue(data) {
              return data.id;
            },
            frame: function frame() {
              return '<div class="' + this.namespace + '">\n          ' + this.options.tpl.items.call(this) + '\n          <div class="' + this.namespace + '-trigger">\n          ' + this.options.tpl.triggerButton.call(this) + '\n          <div class="' + this.namespace + '-trigger-dropdown">\n          ' + this.options.tpl.list.call(this) + '\n          </div>\n          </div>\n          </div>';
            },
            triggerButton: function triggerButton() {
              return '<div class="' + this.namespace + '-trigger-button"><i class="md-plus"></i></div>';
            },
            listItem: function listItem(data) {
              return '<li class="' + this.namespace + '-list-item"><img class="avatar" src="' + data.avatar + '">' + data.name + '</li>';
            },
            item: function item(data) {
              return '<li class="' + this.namespace + '-item"><img class="avatar" src="' + data.avatar + '" title="' + data.name + '">' + this.options.tpl.itemRemove.call(this) + '</li>';
            },
            itemRemove: function itemRemove() {
              return '<span class="' + this.namespace + '-remove"><i class="md-minus-circle"></i></span>';
            },
            option: function option(data) {
              return '<option value="' + this.options.tpl.optionValue.call(this, data) + '">' + data.name + '</option>';
            }
          }
        });
      }
    }, {
      key: 'handleAction',
      value: function handleAction() {
        var _this2 = this;

        this.$actionToggleBtn.on('click', function (e) {
          _this2.$addNewCalendarForm.modal('show');
          e.stopPropagation();
        });
      }
    }, {
      key: 'handleEventList',
      value: function handleEventList() {
        $('#addNewEventBtn').on('click', function () {
          $('#addNewEvent').modal('show');
        });

        $('.calendar-list .calendar-event').each(function () {
          var $this = $(this),
              color = $this.data('color').split('-');
          $this.data('event', {
            title: $this.data('title'),
            stick: $this.data('stick'),
            backgroundColor: (0, _Config.colors)(color[0], color[1]),
            borderColor: (0, _Config.colors)(color[0], color[1])
          });
          $this.draggable({
            zIndex: 999,
            revert: true,
            revertDuration: 0,
            appendTo: '.page',
            helper: function helper() {
              return '<a class="fc-day-grid-event fc-event fc-start fc-end" style="background-color:' + (0, _Config.colors)(color[0], color[1]) + ';border-color:' + (0, _Config.colors)(color[0], color[1]) + '">\n          <div class="fc-content">\n            <span class="fc-title">' + $this.data('title') + '</span>\n          </div>\n          </a>';
            }
          });
        });
      }
    },{
      key: 'handleModalEvent',
      value: function handleModalEvent(){
        // var _this2 = this;
        // $(document).on('click', '#addNewEvent.modal .form-actions #btn-add-event', function(e){
        //   _this2.addEvent(_this2, e);
        // });
      }
    },{
      key: 'addEvent',
      value: function addEvent(_this, e){
        // console.log(_this);
        // console.log(e);
      }
    },{
      key: 'handleListItem',
      value: function handleListItem() {
        this.$actionToggleBtn.on('click', function (e) {
          $('#addNewCalendar').modal('show');
          e.stopPropagation();
        });

        $(document).on('click', '[data-tag=list-delete]', function (e) {
          bootbox.dialog({
            message: 'Do you want to delete the calendar?',
            buttons: {
              success: {
                label: 'Delete',
                className: 'btn-danger',
                callback: function callback() {
                  // $(e.target).closest('.list-group-item').remove();
                }
              }
            }
          });
        });
      }
    }]);
    return AppCalendar;
  }(_Site3.default);

  var instance = null;

  function getInstance() {
    if (!instance) {
      instance = new AppCalendar();
    }
    return instance;
  }

  function run() {
    var app = getInstance();
    app.run();
  }

  exports.AppCalendar = AppCalendar;
  exports.run = run;
  exports.getInstance = getInstance;
  exports.default = AppCalendar;
});
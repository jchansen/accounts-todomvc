define(
  [
    'conductor',
    './Layout',
    './controls/Module',
    'modules/notepad/Module',
    'modules/admin/Module'
  ],
  function (Conductor, Layout, ControlsModule, NotepadModule, AdminModule) {

    return Conductor.LayoutModule.extend({
      view: Layout,

      submodules: [
        {
          module: ControlsModule,
          region: "controlsRegion"
        },
        {
          module: NotepadModule,
          region: "notepadRegion"
        }
      ],

      initialize: function(options){
        this.reqres.setHandler("todoList:name", function(){
          return options.listName;
        });
//        app.commands.setHandler('openTodoListAdminPanel', function(){
//          var module = new AdminModule({listName: options.listName});
//          module.render(this.currentView.notepadRegion);
//        }, this);

        app.commands.setHandler('closeTodoListAdminPanel', function(){
          var module = new NotepadModule();
          module.render(this.currentView.notepadRegion);
        }, this);
      }

    });
  });
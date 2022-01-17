function initEditor() {
  tinymce.init({
    selector: '#mytextarea',
    branding: false,
    elementpath: false,
    height: 300,
    menu: {
      file: { title: '文件', items: 'newdocument' },
      edit: { title: '编辑', items: 'undo redo | cut copy paste pastetext | selectall' },
      insert: { title: '插入', items: 'link media | template hr' },
      view: { title: '查看', items: 'visualaid' },
      format: { title: '格式', items: 'bold italic underline strikethrough superscript subscript | formats | removeformat' },
      table: { title: '表格', items: 'inserttable tableprops deletetable | cell row column' },
      tools: { title: '工具', items: 'spellchecker code' },
      my1: { title: '我的菜单', items: 'copy paste' }
    },
    menubar: 'file edit insert view format table tools help my1',
  });
}

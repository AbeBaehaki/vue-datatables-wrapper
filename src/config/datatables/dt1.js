export default {
  ajax: {
    url: 'https://jsonplaceholder.typicode.com/posts',
    dataSrc: ''
  },
  order: [
    [3, 'asc']
  ],
  columns: [
    {
      title: 'Events',
      render (data, type, row, meta) {
        return '<button class="btn btn-primary btn-xs" data-action="userEvent">userEvent</button>'
      }
    },
    {
      title: 'User ID',
      data: 'userId'
    },
    {
      title: 'ID',
      data: 'id'
    },
    {
      title: 'Title',
      data: 'title'
    }
  ]
}

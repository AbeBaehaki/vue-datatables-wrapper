export default {
  ajax: {
    url: 'https://jsonplaceholder.typicode.com/posts',
    dataSrc: ''
  },
  ordering: true,
  order: [
    [3, 'asc']
  ],
  columns: [
    {
      title: 'Events',
      render: function (data, type, row, meta) {
        return '<button data-action="userEvent">userEvent</button>'
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

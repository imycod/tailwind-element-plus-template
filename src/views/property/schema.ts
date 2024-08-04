export default [
    {
        type: 'input',
        label: 'name',
        name: 'name',
        placeholder: 'please input name',
        rules: [
            {
                required: true,
                message: '姓名不能为空',
            },
        ],
    },
    {
        type: 'input',
        label: 'age',
        name: 'age',
        placeholder: 'please input age',
        rules: [
            {
                required: true,
                message: '年龄不能为空',
            }
        ]
    },
    {
        type: 'date',
        label: 'birthday',
        name: 'birthday',
        placeholder: 'please input birthday',
        width: '100%',
        rules: [
            {
                required: true,
                message: '出生日期不能为空',
            }
        ]
    },
    {
        type: 'select',
        label: 'gender',
        name: 'sex',
        placeholder: 'please select gender',
        options: [
            {
                label: '男',
                value: '1',
            },
            {
                label: '女',
                value: '2',
            },
        ],
        rules: [
            {
                required: true,
                message: '性别不能为'
            }
        ]
    },
    {
        type: 'select',
        label: 'gender',
        name: 'sex',
        placeholder: 'please select gender',
        options: [
            {
                label: '男',
                value: '1',
            },
            {
                label: '女',
                value: '2',
            },
        ],
        rules: [
            {
                required: true,
                message: '性别不能为'
            }
        ]
    },
]

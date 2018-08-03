import React from 'react'
import { hot } from 'react-hot-loader'
import Theme from 'docz-theme-default'

import { imports } from './imports'
import db from './db.json'

const Root = () => <Theme db={db} imports={imports} hashRouter={false} />

export default hot(module)(Root)

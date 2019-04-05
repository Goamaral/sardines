import ejs from 'ejs'
import path from 'path'
import fs from 'fs'
import routes from './routes.json'
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

const render_view = (res, slug, view_props={}) => {
  const view_file_path = path.join(__dirname, 'views', slug + '.ejs')
  const view_file = fs.readFileSync(view_file_path, 'utf-8');
  const content = ejs.render(view_file, { routes, ...view_props })

  const layout_file_path = path.join(__dirname, 'views', slug.split("/")[0], 'layout' + '.ejs')

  ejs.renderFile(layout_file_path, { content, slug, routes }, (_, data) => {
    res.send(data)
  })
}

const hash_password = async password => {
  return await bcrypt.hash(password, SALT_ROUNDS)
}

const compare_password = async (password, encrypted) => {
  return await bcrypt.compare(password, encrypted)
}

export { render_view, hash_password, compare_password }
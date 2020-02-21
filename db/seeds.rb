# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Seeding Data ..."

puts "Creating points ..."

Point.destroy_all
Trip.destroy_all
Trip.create(id: 1, name: "Fun Trip", start_date: "2020-02-10", end_date: '2020-02-20')

Point.create(name: "Fairview Mall", latitude: 43.778191, longitude: -79.344116, start_time: '2020-02-20 02:15:41.123924', end_time: '2020-02-20 03:15:41.123924', trip_id: 1, activity: 'somethings', travel_method: 'driving', travel_duration: 2)
Point.create(name: "Eaton Center", latitude: 43.654640, longitude: -79.380732, start_time: '2020-02-20 04:15:41.123924', end_time: '2020-02-20 05:15:41.123924', trip_id: 1, activity: 'icecream', travel_method: 'walking', travel_duration: 20)
Point.create(name: "CN Tower", latitude: 43.642706, longitude: -79.387078, start_time: '2020-02-20 06:15:41.123924', end_time: '2020-02-20 08:15:41.123924', trip_id: 1, activity: 'sightsee', travel_method: 'bicycling', travel_duration: 12)
Point.create(name: "CN Tower", latitude: 43.642706, longitude: -79.387078, start_time: '2020-02-21 02:15:41.123924', end_time: '2020-02-21 03:15:41.123924', trip_id: 1, activity: 'sightsee', travel_method: 'transit', travel_duration: 12)
Point.create(name: "Lighthouse Lab", latitude: 43.644701, longitude: -79.401970, start_time: '2020-02-21 04:15:41.123924', end_time: '2020-02-21 05:15:41.123924', trip_id: 1, activity: 'nothing', travel_method: 'driving', travel_duration: 2)
Point.create(name: "Fairview Mall", latitude: 43.778191, longitude: -79.344116, start_time: '2020-02-21 06:15:41.123924', end_time: '2020-02-21 07:15:41.123924', trip_id: 1, activity: 'somethings', travel_method: 'walking', travel_duration: 2)
# Point.create(name: "Houston", latitude: 29.7604267, longitude: -95.3698028, start_time: '2020-02-22 02:15:41.123924', end_time: '2020-02-22 03:15:41.123924', trip_id: 1, activity: 'dunno', travel_method: 'Car', travel_duration: 2)
# Point.create(name: "Seattle", latitude: 47.6062095, longitude: 122.3320708, start_time: '2020-02-22 04:15:41.123924', end_time: '2020-02-22 05:15:41.123924', trip_id: 1, activity: 'wot', travel_method: 'Car', travel_duration: 2)



Point.create(name: "Houston", latitude: 29.7604267, longitude: -95.3698028, start_time: '2020-02-20 02:15:41.123924', end_time: '2020-02-20 03:15:41.123924', trip_id: 2)
Point.create(name: "Houston", latitude: 29.7604267, longitude: -95.3698028, start_time: '2020-02-20 04:00:41.123924', end_time: '2020-02-20 05:15:41.123924', trip_id: 2)
//
//  User.swift
//  HeresAFilm
//
//  Created by Niall Rooney on 08/02/2023.
//

import Foundation

struct User: Codable, Identifiable {
    var id: Int
    var username: String
    var email_address: String
    var date_of_birth: String?
}

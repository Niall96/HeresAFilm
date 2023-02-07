//
//  Review.swift
//  HeresAFilm
//
//  Created by Niall Rooney on 06/02/2023.
//

import Foundation

struct ReviewResponse: Codable {
    var results: [Review]
}

struct Review: Codable, Identifiable {
    var id: String?
    var author: String?
    var content: String?
}
